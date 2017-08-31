#!/usr/bin/perl

# use Data::Dumper;

my $FILE = 'elf.txt';
my $FILE_OUT = 'elf.json';

my $fh;

open($fh, $FILE);
my @lines = <$fh>;
close($fh);

my %doParsing = ();
my $symbolTableName = '';
my @sections = ();
my %symbols = ();
my %result = ();

foreach my $line (@lines) {
  $line =~ s/[\r\n]+$//;

  if ($line =~ /Section Headers:/) {
    $doParsing{'header'} = 1;
    print "Found sections table\n";
    next;
  } elsif ($line =~ /Key to Flags:/) {
    $doParsing{'header'} = 0;
    next;
  } elsif ($line =~ /Symbol table '([^\']+)' contains (\d+) entries:/) {
    $symbolTableName = $1;
    $doParsing{'symbol'} = 1;
    print "Found symbol table: $symbolTableName\n";
    @{$symbols{$symbolTableName}} = ();
    # print Dumper(\%sections);
    next;
  }

  if ($doParsing{'header'}) {
    # parsing 1st line of section
    #   [Nr] Name              Type            Address          Off    Size   ES Flg Lk Inf Al
    my @data = ($line =~ /^\s+\[\s*(\d+)\]\s+(.*?)\s+([A-Z_]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+([WAXMSlILGTExOop]*)\s+(\d+)\s+(\d+)\s+(\d+)$/);
    if (@data) {
      # print "section: ", join(', ', @data), "\n";
      my $section = {
        'number' => $data[0],
        'name' => $data[1] || '<none>',
        'type' => $data[2],
        'address' => $data[3],
        'offset' => $data[4],
        'size' => $data[5],
        'entsize' => $data[6],
        'flags' => $data[7],
      };
      push(@sections, $section);
    }
  }

  if ($doParsing{'symbol'}) {
    # 61: 0000000000400700   101 FUNC    GLOBAL DEFAULT   14 __libc_csu_init
    my @data = ($line =~ /^\s+(\d+):\s+([0-9a-f]+)\s+(\d+)\s+([A-Z]+)\s+([A-Z]+)\s+([A-Z]+)\s+(\S+)\s+(.*)$/);
    if (@data) {
      # print "found symbol: " . join(',', @data) . "\n";
      my $symbol = {
        'number' => $data[0],
        'value' => $data[1],
        'size' => $data[2],
        'type' => $data[3],
        'bind' => $data[4],
        'vis' => $data[5],
        'index' => $data[6],
        'name' => $data[7] || '<none>',
      };
      # print Dumper($symbol);
      push(@{$symbols{$symbolTableName}}, $symbol);
    }
  }

}

#print Dumper(\@sections);
#print Dumper(\%symbols);

my $fh_out;
open($fh_out, ">" . $FILE_OUT);

print $fh_out "[\n";
foreach my $section (@sections) {
  print $fh_out "  {\n";
  print $fh_out '    "number": "' . $section->{'number'} . '",' . "\n";
  print $fh_out '    "name": "' . $section->{'name'} . '",' . "\n";
  print $fh_out '    "type": "' . $section->{'type'} . '",' . "\n";
  print $fh_out '    "address": "0x' . $section->{'address'} . '",' . "\n";
  print $fh_out '    "offset": "0x' . $section->{'offset'} . '",' . "\n";
  print $fh_out '    "size": ' . hex($section->{'size'}) . ',' . "\n";
  # print '    "entsize": ' . $section->{'entsize'} . '"' . "\n";
  if (defined $symbols{$section->{'name'}}) {
    print $fh_out '    "flags": "' . $section->{'flags'} . '",' . "\n";
    print $fh_out '    "symbols": [' . "\n";
    foreach my $symbol (@{$symbols{$section->{'name'}}}) {
      print $fh_out '      {' . "\n";
      print $fh_out '        "number": "' . $symbol->{'number'} . '",' . "\n";
      print $fh_out '        "name": "' . $symbol->{'name'} . '",' . "\n";
      print $fh_out '        "value": "0x' . $symbol->{'value'} . '",' . "\n";
      print $fh_out '        "size": ' . $symbol->{'size'} . ',' . "\n";
      print $fh_out '        "type": "' . $symbol->{'type'} . '",' . "\n";
      print $fh_out '        "bind": "' . $symbol->{'bind'} . '",' . "\n";
      print $fh_out '        "vis": "' . $symbol->{'vis'} . '",' . "\n";
      print $fh_out '        "index": "' . $symbol->{'index'} . '"' . "\n";
      if (\$symbol == \@{$symbols{$section->{'name'}}}[-1]) {
        print $fh_out '      }' . "\n";
      } else {
        print $fh_out '      },' . "\n";
      }
    }
    print $fh_out '    ]' . "\n";
  } else {
    print $fh_out '    "flags": "' . $section->{'flags'} . '"' . "\n";
  }
  if (\$section == \$sections[-1]) {
    print $fh_out "  }\n";
  } else {
    print $fh_out "  },\n";
  }
}
print $fh_out "]\n";

close($fh_out);
