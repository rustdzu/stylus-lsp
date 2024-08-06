local capabilities = vim.lsp.protocol.make_client_capabilities()

capabilities.hoverProvider = false

local function get_script_path()
    local str = debug.getinfo(2, "S").source:sub(2)
    return str:match("(.*/)")
end

local config_path = get_script_path()

local server_path = vim.fn.fnamemodify(config_path .. '/../../src/server.ts', ':p')

local global_npm_path = vim.fn.trim(vim.fn.system('npm root -g'))

vim.api.nvim_create_autocmd("FileType", {
    pattern = "stylus",
    callback = function()
        vim.bo.tabstop = 2
        vim.bo.shiftwidth = 2
        vim.bo.softtabstop = 2
        vim.bo.expandtab = true
        vim.lsp.start({
            name = "stylus_lsp",
            cmd = {"npx", "--prefix", global_npm_path, "ts-node", server_path, "--stdio" },
            filetypes = { 'stylus' },
            capabilities = capabilities,
            on_attach = function(client, bufnr)
                print("LSP attached to buffer " .. bufnr)
            end
        })
    end
})
