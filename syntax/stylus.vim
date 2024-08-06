" ~/.config/nvim/syntax/stylus.vim
syntax case ignore

" Highlight .Root as class
syntax match stylusClass "^\s*\.\w\+" containedin=ALL

" Highlight property (property: value)
syntax match stylusProperty "^\s*\w\+\s*:" containedin=ALL

" Highlight value (value)
syntax match stylusValue "\s*:\s*\S\+" containedin=ALL

" Highlight variable ($variable)
syntax match stylusVariable "\$[a-zA-Z_][a-zA-Z0-9_-]*" containedin=ALL

" Highlight function (some-func) with parameters
syntax match stylusFunction "[a-zA-Z][a-zA-Z\-]*(\([^)]*\))" containedin=ALL

" Highlight @require
syntax match stylusRequire "@require" containedin=ALL

" Highlight strings in single quotes
syntax match stylusSingleString "'[^']*'" containedin=ALL

" Highlight strings in double quotes
syntax match stylusDoubleString "\"[^\"]*\"" containedin=ALL

" Highlight property values starting with @
syntax match stylusAtValue "@\w\+" containedin=ALL

" Set colors in Catppuccin Mocha style
highlight stylusClass guifg=#A28CBF guibg=NONE ctermfg=103 ctermbg=NONE
highlight stylusProperty guifg=#A6E3A1 guibg=NONE ctermfg=114 ctermbg=NONE
highlight stylusValue guifg=#F9E2AF guibg=NONE ctermfg=229 ctermbg=NONE
highlight stylusVariable guifg=#F38BA8 guibg=NONE ctermfg=204 ctermbg=NONE
highlight stylusFunction guifg=#74C7EC guibg=NONE ctermfg=117 ctermbg=NONE

highlight stylusRequire guifg=#FAB387 guibg=NONE ctermfg=215 ctermbg=NONE
highlight stylusSingleString guifg=#B4BEFE guibg=NONE ctermfg=147 ctermbg=NONE
highlight stylusDoubleString guifg=#B4BEFE guibg=NONE ctermfg=147 ctermbg=NONE
highlight stylusAtValue guifg=#F38BA8 guibg=NONE ctermfg=204 ctermbg=NONE
