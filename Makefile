# Имя вашего проекта
PROJECT_NAME = stylus-lsp

# Команда для установки npm-зависимостей
NPM_INSTALL = npm install

# Путь к вашему файлу package.json
PACKAGE_JSON = ./package.json

# Цель по умолчанию
all: install

# Цель для установки npm-зависимостей
install: $(PACKAGE_JSON)
	@echo "Installing npm dependencies for $(PROJECT_NAME)..."
	$(NPM_INSTALL)

# Цель для очистки node_modules
clean:
	@echo "Cleaning npm dependencies for $(PROJECT_NAME)..."
	rm -rf node_modules

# Цель для повторной установки npm-зависимостей
reinstall: clean install

# Указываем, что файл package.json является требованием для установки
$(PACKAGE_JSON):

# Описание целей
.PHONY: all install clean reinstall
