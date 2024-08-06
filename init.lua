local capabilities = vim.lsp.protocol.make_client_capabilities()

capabilities.hoverProvider = false

local config_path = vim.fn.expand('<sfile>:p:h')

local server_path = vim.fn.fnamemodify(config_path .. '/src/server.ts', ':p')

vim.api.nvim_create_autocmd("FileType", {
    pattern = "stylus",
    callback = function()
        vim.bo.tabstop = 2
        vim.bo.shiftwidth = 2
        vim.bo.softtabstop = 2
        vim.bo.expandtab = true
        vim.lsp.start({
            name = "stylus_lsp",
            cmd = { server_path },
            filetypes = { 'stylus' },
            capabilities = capabilities,
            on_attach = function(client, bufnr)
                print("LSP attached to buffer " .. bufnr)
            end
        })
    end
})
