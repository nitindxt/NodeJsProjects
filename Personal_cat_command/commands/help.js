// Help fn 
function helpFn() {
    console.log(`
    NAME
       pcat  - concatenate files and
       print on the standard output

    SYNOPSIS
       pcat [OPTION]... [FILE]...
    
    DESCRIPTION
       Concatenate FILE(s) to stan‐
       dard output.

       With  no  FILE, or when FILE
       is not present, give error.

       -s   remove extra newlines
            (2 or more consecutive newlines)
        
       -b   give numbering to non-empty lines
       
       -n   give numbering to all lines

    EXAMPLES
       pcat -s f.txt
              Output f's  contents,
              on standard output,
              with extra newlines removed.

       pcat -s -b f.txt d.txt    
              Output f's and d's contents,
              on standard output,
              with extra newlines removed
              and with numbering to non-empty
              lines.
    
    AUTHOR
       Written by Nitin Dixit.
    `
    );
}

module.exports = {
    helpKey: helpFn
}