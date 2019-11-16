export default function getTerminalTheme(theme) {
    return {
        background: theme.vscodeTheme.colors['terminal.background'] || theme.background2(),
        black: theme.vscodeTheme.colors['terminal.ansiBlack'],
        blue: theme.vscodeTheme.colors['terminal.ansiBlue'],
        brightBlack: theme.vscodeTheme.colors['terminal.ansiBrightBlack'],
        brightBlue: theme.vscodeTheme.colors['terminal.ansiBrightBlue'],
        brightCyan: theme.vscodeTheme.colors['terminal.ansiBrightCyan'],
        brightGreen: theme.vscodeTheme.colors['terminal.ansiBrightGreen'],
        brightMagenta: theme.vscodeTheme.colors['terminal.ansiBrightMagenta'],
        brightRed: theme.vscodeTheme.colors['terminal.ansiBrightRed'],
        brightWhite: theme.vscodeTheme.colors['terminal.ansiBrightWhite'],
        brightYellow: theme.vscodeTheme.colors['terminal.ansiBrightYellow'],
        cyan: theme.vscodeTheme.colors['terminal.ansiCyan'],
        foreground: theme.vscodeTheme.colors['terminal.foreground'] ||
            theme.vscodeTheme.colors['panel.foreground'],
        green: theme.vscodeTheme.colors['terminal.ansiGreen'],
        magenta: theme.vscodeTheme.colors['terminal.ansiMagenta'],
        red: theme.vscodeTheme.colors['terminal.ansiRed'],
        white: theme.vscodeTheme.colors['terminal.ansiWhite'],
        yellow: theme.vscodeTheme.colors['terminal.ansiYellow'],
        selection: theme.vscodeTheme.colors['terminal.selectionBackground'],
        cursor: theme.vscodeTheme.colors['terminalCursor.foreground'],
        cursorAccent: theme.vscodeTheme.colors['terminalCursor.background'],
    };
}
