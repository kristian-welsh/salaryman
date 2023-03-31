" run tests, keep and format result, echo it in vim
command -bar Test let @t=system("./src/tools/quiet-test.sh") | echomsg @t
command -bar Start exe system("./src/tools/setup.sh")
command -bar Stop exe system("./src/tools/teardown.sh")
command -bar Reset exe system("./src/tools/reset.sh")

autocmd VimEnter ./src/* Start
autocmd BufWritePost ./src/* Reset | Test
autocmd VimLeavePre ./src/* Stop

set ffs=unix

