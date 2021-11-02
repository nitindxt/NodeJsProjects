# pcat (A personal cat command)🚀🚀 
It is used to concatenate files and print on the standard output. (terminal)

## Commands and -options:
- [x] 1- pcat filename => displays content of the file in the terminal.
- [x] 2- pcat filename1 filename2 filename3... => displays content of all files in the terminal (in concatinated form) in the given order.
- [x] 3- pcat -s filename => convert 2 or more line breaks into a singular line break.

- [x] 4- pcat -n filename => give numbering to all the lines.  
- [x] 5- pcat -b filename => give numbering to non-empty lines. 
- [x] 6- pcat filename > filename2 => put all the content of filename into filename2 by overriding and also creates filename2 if it doesn't exists. 
- [x] 7- pcat filename2path >> filename2path => append all the content of filename into filename2 
- [x] 8- node pcat -s filename > filename2 => get the file content of filename remove large spaces and save the output in filename2. 

>We can put -options in any order.

## Edge cases to watch out for ⚠️:

- [x] 1- If file entered is not found then it gives file doesn't exist! error.
- [x] 2- If -n and -b both options are available together then command gives you an error.