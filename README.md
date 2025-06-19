# Playwright Dev Container with VNC Support

This repository demonstrates a complete Playwright testing setup inside a VS Code dev container with support for headed browser testing via VNC. Perfect for testing web applications that require visual verification or debugging.

## Features

- 🐳 **Dev Container Ready**: Pre-configured VS Code dev container with all dependencies
- 🎭 **Playwright Testing**: Full Playwright test suite with TypeScript support
- 🖥️ **Headed Browser Testing**: Run tests with visible browsers using VNC
- 📊 **HTML Reports**: Interactive test reports accessible via web browser
- 🔧 **ARM64 Support**: Optimized for ARM64 architecture (Apple Silicon, etc.)
- 🎯 **Multiple Test Modes**: Headless, headed, debug, and VNC-enabled testing

## Quick Start

### Prerequisites

- [VS Code](https://code.visualstudio.com/) with [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker](https://www.docker.com/) installed and running
- [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/) (for headed testing)

### Setup

1. **Clone and Open**: Open this project in VS Code
2. **Start Container**: When prompted, click "Reopen in Container"
3. **Wait for Setup**: The container will automatically install dependencies
4. **Access Ports**: VS Code will forward the necessary ports automatically

## Container Architecture

This project uses the official Microsoft Playwright Docker image (`mcr.microsoft.com/playwright:v1.53.1-noble`) with additional components:

- **Base Image**: `mcr.microsoft.com/playwright:v1.53.1-noble`
- **User**: `pwuser` (non-root for security)
- **Display Server**: Xvfb (virtual framebuffer) on display `:99`
- **VNC Server**: x11vnc for remote desktop access
- **Ports**: 
  - `9323`: Playwright HTML report server
  - `5900`: VNC server (primary)
  - `5901`: VNC server (fallback)

## Running Tests

### Basic Test Commands

```bash
# Run all tests (headless)
yarn test

# Run tests with headed browsers (requires VNC)
yarn test:headed

# Run tests with VNC server (recommended for headed testing)
yarn test:vnc

# Debug mode with browser inspector
yarn test:debug

# Slow mode for debugging (30s timeout)
yarn test:headed-slow
```

### Test Report Access

After running tests, access the HTML report:

1. **Inside Container**: `http://localhost:9323`
2. **From Host**: `http://localhost:9324` (VS Code automatically forwards to avoid conflicts)

### VNC Access for Headed Testing

To view headed browser tests:

1. **Install VNC Viewer**:
   - **macOS**: 
     - Download [RealVNC Viewer](https://www.realvnc.com/en/connect/download/viewer/macos/) (recommended)
     - Or use built-in Screen Sharing: `Cmd + K` in Finder, then enter `vnc://localhost:5900`
     - Alternative: Install via Homebrew: `brew install --cask vnc-viewer`
   - **Windows**: 
     - Download [RealVNC Viewer](https://www.realvnc.com/en/connect/download/viewer/windows/)
     - Or use built-in Remote Desktop Connection (limited VNC support)
     - Alternative: Install [TightVNC Viewer](https://www.tightvnc.com/download.php)
   - **Linux**: `sudo apt install tigervnc-viewer` or download RealVNC Viewer

2. **Connect to VNC**:
   - **Host**: `localhost:5900` (or `localhost:5901` if 5900 is busy)
   - **No password required** (configured for development)
   - **Connection Steps**:
     - **RealVNC Viewer**: Enter `localhost:5900` in the address bar
     - **macOS Screen Sharing**: Enter `vnc://localhost:5900` in the server field
     - **Windows**: Use the IP address field and enter `localhost:5900`

3. **macOS Specific Instructions**:
   ```bash
   # Using built-in Screen Sharing
   1. Press Cmd + K in Finder
   2. Enter: vnc://localhost:5900
   3. Click "Connect"
   4. If prompted about security, click "Continue"
   
   # Using RealVNC Viewer
   1. Open RealVNC Viewer
   2. Enter: localhost:5900
   3. Click "Connect"
   4. Accept any security warnings
   ```

4. **Windows Specific Instructions**:
   ```bash
   # Using RealVNC Viewer
   1. Open RealVNC Viewer
   2. Enter: localhost:5900 in the address bar
   3. Click "Connect"
   4. Accept any security prompts
   
   # Using TightVNC Viewer
   1. Open TightVNC Viewer
   2. Enter: localhost:5900
   3. Click "Connect"
   4. No password needed
   ```

5. **Run Headed Tests**:
   ```bash
   yarn test:vnc
   ```

6. **Troubleshooting VNC Connection**:
   - **Connection Refused**: Ensure the dev container is running and port 5900 is forwarded
   - **Black Screen**: The VNC server may need to be restarted inside the container
   - **Port Busy**: Try connecting to `localhost:5901` instead
   - **Security Warnings**: Accept/continue through any security prompts (development environment)

## Project Structure

```
jest-playwright-devcontainers/
├── .devcontainer/          # VS Code dev container configuration
│   ├── devcontainer.json   # Container settings and port forwarding
│   └── Dockerfile         # Container image with VNC support
├── tests/                  # Playwright test files
│   └── demo-playwright.test.ts
├── playwright.config.ts    # Playwright configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── Makefile              # Convenience commands
```

## Configuration

### Playwright Config (`playwright.config.ts`)

- **Test Directory**: `./tests`
- **Reporter**: HTML reporter enabled
- **Browser**: Chromium with headed mode
- **Viewport**: 1920x1080
- **Base URL**: `http://127.0.0.1:3000`

### Dev Container Config (`.devcontainer/devcontainer.json`)

- **Port Forwarding**: 9323, 5900, 5901
- **Extensions**: ESLint, TypeScript support
- **User**: `pwuser` (non-root)
- **Post-creation**: Automatic `yarn install`

## Troubleshooting

### Common Issues

#### Port Conflicts
- **VNC Port 5900 Busy**: VS Code automatically forwards to 5901
- **Report Port 9323 Busy**: VS Code forwards to 9324 on host

#### VNC Connection Issues
```bash
# Restart VNC server inside container
pkill x11vnc
x11vnc -display :99 -nopw -listen localhost -xkb -ncache 10 -ncache_cr -forever &
```

#### Test Report Server Issues
```bash
# Restart report server with proper binding
npx playwright show-report --host 0.0.0.0
```

#### Container Rebuild
If you encounter persistent issues:
1. **VS Code Command Palette**: "Dev Containers: Rebuild Container"
2. **Clean Docker**: `make clean`

### Performance Tips

- **Headless Mode**: Use `yarn test` for faster CI/CD
- **Headed Mode**: Use `yarn test:vnc` for debugging and visual verification
- **Debug Mode**: Use `yarn test:debug` for step-by-step debugging

## Development Workflow

1. **Write Tests**: Add test files in `tests/` directory
2. **Run Locally**: Use `yarn test` for quick feedback
3. **Debug Visually**: Use `yarn test:vnc` and VNC viewer
4. **Generate Reports**: View detailed reports at `localhost:9324`
5. **Iterate**: Modify tests and repeat

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn test` | Run all tests (headless) |
| `yarn test:headed` | Run tests with visible browsers |
| `yarn test:vnc` | Run tests with VNC server |
| `yarn test:debug` | Debug mode with inspector |
| `yarn test:headed-slow` | Slow mode for debugging |

## Make Commands

| Command | Description |
|---------|-------------|
| `make help` | Show available commands |
| `make clean` | Clean up Docker resources |
| `make record URL=<url>` | Record a test using Playwright codegen |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests in the `tests/` directory
4. Ensure all tests pass with `yarn test`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues related to:
- **Playwright**: [Playwright Documentation](https://playwright.dev/)
- **Dev Containers**: [VS Code Dev Containers](https://code.visualstudio.com/docs/remote/containers)
- **VNC**: [RealVNC Documentation](https://www.realvnc.com/en/connect/docs/)