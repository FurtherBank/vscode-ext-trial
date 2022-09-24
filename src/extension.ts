// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HelloWorld from './command/hello-world';
import Command from './core/command/command';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cpu-ext-trial" is now active!');

	// just fill this array by your commands, then will automatically register
	// note: don't forget to fill the command in package.json
	const commands: (typeof Command)[] = [HelloWorld]

	commands.forEach((command) => {
		command.register(context)
	})
}

// this method is called when your extension is deactivated
export function deactivate() {}
