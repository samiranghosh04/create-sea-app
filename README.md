# Create Sea App

A command-line tool for quickly setting up a new project with Sea JS using Vite.

## Features

- Quickly create a new project with a predefined setup.
- Automatically generates `package.json` with the latest versions of `sea-js-ui-core` and `vite`.
- Includes a customizable template for initial project setup.

## Installation

### Using `npx`

You can use the CLI without installing it globally by running:

```bash
npx create-sea-app <project-name>
```

### Global Installation

To install the CLI globally:

```bash
npm install -g create-sea-app
```

## Usage

After installation, you can use the CLI to create a new project:

```bash
create-sea-app <project-name>
```

Replace `<project-name>` with the desired name of your project. This command will:

1. Create a new directory named `<project-name>`.
2. Copy the template files into the new directory.
3. Generate a `package.json` file with the latest versions of `sea-js-ui-core` and `vite`.

### Example

To create a project named `my-app`, run:

```bash
create-sea-app my-app
```

Navigate to the project directory and install the dependencies:

```bash
cd my-app
npm install
```

Start the development server:

```bash
npm start
```

## Configuration

The CLI generates a basic project setup with the following configuration:

- `package.json`: Includes scripts for starting, building, and serving the app.
- Vite as the build tool.
- `sea-js-ui-core` as a core dependency.

### Template Customization

The CLI uses a default template located in the `templates` directory. You can customize this template as needed.

## Development

To develop or contribute to the CLI:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd create-sea-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Make changes to the source code in the `src` directory.

5. Link the CLI globally for testing:

   ```bash
   npm link
   ```

6. Test the CLI:

   ```bash
   create-sea-app <project-name>
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This CLI is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Vite](https://vitejs.dev/) - The build tool used in this project.
