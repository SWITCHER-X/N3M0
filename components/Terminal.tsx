"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface TerminalOutput {
  type: "command" | "output" | "error" | "success" | "info";
  content: string | string[];
}

interface TerminalProps {
  onClose: () => void;
}

const AVAILABLE_COMMANDS = ["help", "clear", "whoami", "ls", "cd", "pwd", "cat", "echo", "date", "uname", "uptime", "fortune", "matrix", "hack", "sudo", "home", "exit"];

// Hidden easter egg commands (not shown in help)
const HIDDEN_COMMANDS = ["42", "hello", "hi", "coffee", "tea", "ping", "pong", "rm -rf", "nano", "vim", "emacs", "boss", "secret", "konami"];

// Command aliases
const ALIASES: Record<string, string> = {
  "ll": "ls -la",
  "la": "ls -la",
  "..": "cd ..",
  "~": "cd ~",
};

export const Terminal = ({ onClose }: TerminalProps) => {
  const router = useRouter();
  const [terminalCommand, setTerminalCommand] = useState("");
  const [outputs, setOutputs] = useState<TerminalOutput[]>([
    { type: "info", content: "Welcome to the terminal. Type 'help' for commands." }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("/home/bosco");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs]);

  const addOutput = (output: TerminalOutput) => {
    setOutputs((prev) => [...prev, output]);
  };

  const getCommandSuggestions = (input: string): string[] => {
    if (!input) return [];
    const lowerInput = input.toLowerCase();
    return AVAILABLE_COMMANDS.filter(cmd => 
      cmd.startsWith(lowerInput) && cmd !== lowerInput
    );
  };

  const findSimilarCommand = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    let bestMatch: string | null = null;
    let minDistance = Infinity;

    AVAILABLE_COMMANDS.forEach(cmd => {
      // Simple Levenshtein-like distance
      const distance = Math.abs(cmd.length - lowerInput.length);
      if (distance < minDistance && cmd.includes(lowerInput.slice(0, 2))) {
        minDistance = distance;
        bestMatch = cmd;
      }
    });

    return bestMatch;
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Check for aliases first
    let actualCmd = trimmedCmd;
    const alias = ALIASES[trimmedCmd.toLowerCase()];
    if (alias) {
      actualCmd = alias;
    }

    // Add to history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command to output
    addOutput({ type: "command", content: trimmedCmd });

    const [command, ...args] = actualCmd.split(" ");
    const lowerCommand = command.toLowerCase();

    // Handle commands
    switch (lowerCommand) {
      case "help":
        addOutput({
          type: "info",
          content: [
            "Available commands:",
            "  help     - Show this help message",
            "  clear    - Clear terminal",
            "  whoami   - Display user information",
            "  ls       - List projects",
            "  cd [dir] - Change directory",
            "  pwd      - Print working directory",
            "  cat [file] - Display file contents",
            "  echo [text] - Echo text",
            "  date     - Show current date and time",
            "  uname    - Show system information",
            "  uptime   - Show system uptime",
            "  fortune  - Show a random quote",
            "  home     - Navigate to home page",
            "  exit     - Close terminal",
            "",
            "Aliases:",
            "  ll, la   - List all files (ls -la)",
            "  ..       - Go to parent directory",
            "  ~        - Go to home directory"
          ]
        });
        break;

      case "clear":
        setOutputs([{ type: "info", content: "Terminal cleared." }]);
        break;

      case "whoami":
        addOutput({
          type: "success",
          content: "Clinton Omotoiynbo - Cybersecurity Specialist & Tech Enthusiast"
        });
        break;

      case "ls":
        const lsArgs = args[0];
        if (lsArgs === "-la" || lsArgs === "-a") {
          addOutput({
            type: "info",
            content: [
              "total 8",
              "drwxr-xr-x  2 bosco bosco  4096 Jan 2025  .",
              "drwxr-xr-x  3 bosco bosco  4096 Jan 2025  ..",
              "-rw-r--r--  1 bosco bosco   220 Jan 2025  .bashrc",
              "-rw-r--r--  1 bosco bosco   220 Jan 2025  projects.txt",
              "",
              "Projects:",
              "  [Coming soon...]"
            ]
          });
        } else {
          addOutput({
            type: "info",
            content: [
              "Projects:",
              "  [Coming soon...]",
              "",
              "Use 'cd' to navigate directories"
            ]
          });
        }
        break;

      case "cd":
        const targetDir = args[0];
        if (!targetDir || targetDir === "~" || targetDir === "/") {
          setCurrentPath("/home/bosco");
          addOutput({ type: "success", content: `Changed directory to /home/bosco` });
        } else if (targetDir === "..") {
          const newPath = currentPath.split("/").slice(0, -1).join("/") || "/";
          setCurrentPath(newPath);
          addOutput({ type: "success", content: `Changed directory to ${newPath}` });
        } else {
          setCurrentPath(`${currentPath}/${targetDir}`);
          addOutput({ type: "success", content: `Changed directory to ${currentPath}/${targetDir}` });
        }
        break;

      case "pwd":
        addOutput({ type: "info", content: currentPath });
        break;

      case "cat":
        const fileName = args[0];
        if (!fileName) {
          addOutput({ type: "error", content: "cat: missing file operand" });
        } else {
          addOutput({
            type: "info",
            content: `Contents of ${fileName}:\n[File reading not implemented in this demo]`
          });
        }
        break;

      case "echo":
        const text = args.join(" ");
        addOutput({ type: "info", content: text || "" });
        break;

      case "date":
        const now = new Date();
        addOutput({
          type: "info",
          content: now.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
          })
        });
        break;

      case "uname":
        addOutput({
          type: "info",
          content: [
            "System: bosco.dev",
            "Kernel: Next.js 16.0.0",
            "Architecture: Web",
            "Hostname: localhost:404",
            "OS: Portfolio OS v1.0"
          ]
        });
        break;

      case "uptime":
        const startTime = Date.now() - Math.floor(Math.random() * 86400000 * 7); // Random uptime up to 7 days
        const uptimeMs = Date.now() - startTime;
        const days = Math.floor(uptimeMs / 86400000);
        const hours = Math.floor((uptimeMs % 86400000) / 3600000);
        const minutes = Math.floor((uptimeMs % 3600000) / 60000);
        addOutput({
          type: "info",
          content: `up ${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}`
        });
        break;

      case "fortune":
        const fortunes = [
          "The best way to predict the future is to implement it.",
          "Code is like humor. When you have to explain it, it's bad.",
          "First, solve the problem. Then, write the code.",
          "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
          "The only way to learn a new programming language is by writing programs in it.",
          "Debugging is twice as hard as writing the code in the first place.",
          "It's not a bug, it's a feature.",
          "There are only two kinds of programming languages: those people complain about and those nobody uses.",
          "Premature optimization is the root of all evil.",
          "The best code is no code at all.",
          "In cybersecurity, the only secure system is one that's powered off, cast in a block of concrete, and sealed in a lead-lined room with armed guards.",
          "The most secure code is the code that doesn't exist.",
          "Trust, but verify. Especially in networking.",
          "The best defense is a good offense. And a good firewall.",
        ];
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        addOutput({ type: "success", content: randomFortune });
        break;

      case "matrix":
        addOutput({
          type: "success",
          content: [
            "Wake up, Neo...",
            "",
            "The Matrix has you...",
            "Follow the white rabbit.",
            "",
            "Knock, knock, Neo."
          ]
        });
        break;

      case "hack":
        addOutput({
          type: "error",
          content: [
            "Initializing hack sequence...",
            "[████████████████████] 100%",
            "",
            "Access granted.",
            "System compromised.",
            "",
            "Just kidding. This is a portfolio, not a pentest lab. 😄"
          ]
        });
        break;

      case "sudo":
        addOutput({
          type: "error",
          content: "sudo: you are not in the sudoers file. This incident will be reported."
        });
        break;

      // Hidden easter egg commands
      case "42":
        addOutput({
          type: "success",
          content: [
            "The Answer to the Ultimate Question of Life, the Universe, and Everything.",
            "",
            "But what is the question?"
          ]
        });
        break;

      case "hello":
      case "hi":
        const greetings = [
          "Hello! 👋",
          "Hey there!",
          "Hi! How can I help?",
          "Greetings, human.",
          "Hello, world!",
        ];
        addOutput({
          type: "success",
          content: greetings[Math.floor(Math.random() * greetings.length)]
        });
        break;

      case "coffee":
        addOutput({
          type: "info",
          content: [
            "Brewing coffee...",
            "[████████████████████] 100%",
            "",
            "☕ Coffee is ready!",
            "But you can't drink it through the terminal. Sorry."
          ]
        });
        break;

      case "tea":
        addOutput({
          type: "info",
          content: [
            "Steeping tea...",
            "[████████████████████] 100%",
            "",
            "🍵 Tea is ready!",
            "Perfect for debugging sessions."
          ]
        });
        break;

      case "ping":
        addOutput({
          type: "info",
          content: [
            "PING localhost (127.0.0.1): 56 data bytes",
            "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms",
            "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms",
            "64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms",
            "",
            "--- localhost ping statistics ---",
            "3 packets transmitted, 3 received, 0% packet loss",
            "round-trip min/avg/max = 0.038/0.040/0.042 ms"
          ]
        });
        break;

      case "pong":
        addOutput({
          type: "success",
          content: "🏓 Pong! You found the ping-pong easter egg!"
        });
        break;

      case "rm":
        if (args[0] === "-rf" && args[1] === "/") {
          addOutput({
            type: "error",
            content: [
              "rm: it is dangerous to operate recursively on '/'",
              "rm: use --no-preserve-root to override this failsafe",
              "",
              "Nice try, but we're not letting you delete everything. 😄"
            ]
          });
        } else {
          addOutput({
            type: "error",
            content: "rm: missing operand. Try 'rm -rf /' for a surprise. (Just kidding, don't!)"
          });
        }
        break;

      case "nano":
      case "vim":
      case "emacs":
        addOutput({
          type: "error",
          content: [
            `${command}: command not found`,
            "",
            "This is a web terminal, not a real one.",
            "But if you want to edit files, try 'cat filename' instead."
          ]
        });
        break;

      case "boss":
        addOutput({
          type: "success",
          content: [
            "You're the boss! 🎉",
            "",
            "But remember: with great power comes great responsibility.",
            "Use your cybersecurity skills for good!"
          ]
        });
        break;

      case "secret":
        addOutput({
          type: "info",
          content: [
            "You found a secret command!",
            "",
            "Here's a secret: This terminal has many hidden commands.",
            "Try: 42, hello, coffee, tea, ping, pong, boss, konami",
            "",
            "Happy exploring! 🕵️"
          ]
        });
        break;

      case "konami":
        addOutput({
          type: "success",
          content: [
            "🎮 Konami Code detected!",
            "",
            "↑ ↑ ↓ ↓ ← → ← → B A",
            "",
            "You've unlocked: Nothing. But you tried! 😄",
            "",
            "For real Konami code, try pressing the keys on the page."
          ]
        });
        break;

      case "home":
        router.push("/");
        addOutput({ type: "success", content: "Navigating to home page..." });
        setTimeout(() => {
          onClose();
        }, 500);
        break;

      case "exit":
        onClose();
        break;

      default:
        const suggestion = findSimilarCommand(lowerCommand);
        if (suggestion) {
          addOutput({
            type: "error",
            content: `Command not found: ${command}. Did you mean '${suggestion}'?`
          });
        } else {
          addOutput({
            type: "error",
            content: `Command not found: ${command}. Type 'help' for available commands.`
          });
        }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (terminalCommand.trim()) {
        handleCommand(terminalCommand);
        setTerminalCommand("");
        setAutocompleteSuggestions([]);
      }
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setTerminalCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalCommand("");
        } else {
          setHistoryIndex(newIndex);
          setTerminalCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getCommandSuggestions(terminalCommand);
      if (suggestions.length === 1) {
        setTerminalCommand(suggestions[0]);
        setAutocompleteSuggestions([]);
      } else if (suggestions.length > 1) {
        setAutocompleteSuggestions(suggestions);
      }
    } else {
      // Update suggestions as user types
      const suggestions = getCommandSuggestions(terminalCommand);
      setAutocompleteSuggestions(suggestions);
    }
  };

  const getOutputColor = (type: TerminalOutput["type"]) => {
    switch (type) {
      case "command":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "success":
        return "text-green-400";
      case "info":
        return "text-foreground/80";
      default:
        return "text-foreground";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background border-2 border-green-500 rounded-lg p-3 sm:p-4 w-[calc(100%-1rem)] sm:w-full max-w-2xl mx-2 sm:mx-4 font-mono text-xs sm:text-sm shadow-2xl">
        <div className="flex justify-between items-center mb-2 gap-2">
          <span className="text-green-500 text-xs sm:text-sm truncate">&gt; Terminal - {currentPath}</span>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 rounded shrink-0"
            aria-label="Close terminal"
          >
            ✕
          </button>
        </div>
        <div
          ref={outputRef}
          className="bg-foreground/5 p-2 sm:p-3 rounded min-h-[180px] sm:min-h-[200px] max-h-[50vh] sm:max-h-[400px] overflow-y-auto mb-2"
        >
          {outputs.map((output, index) => (
            <div key={index} className={`mb-2 ${getOutputColor(output.type)}`}>
              {output.type === "command" && (
                <span className="text-green-500">&gt; </span>
              )}
              {Array.isArray(output.content) ? (
                output.content.map((line, i) => (
                  <div key={i}>{line}</div>
                ))
              ) : (
                <span>{output.content}</span>
              )}
            </div>
          ))}
          {autocompleteSuggestions.length > 1 && terminalCommand && (
            <div className="text-foreground/50 text-xs mt-2">
              Suggestions: {autocompleteSuggestions.join(", ")}
            </div>
          )}
          <div className="flex items-center mt-2">
            <span className="text-green-500">&gt; </span>
            <input
              ref={inputRef}
              type="text"
              value={terminalCommand}
              onChange={(e) => setTerminalCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 ml-2 text-foreground focus:ring-2 focus:ring-green-500 rounded"
              autoFocus
              aria-label="Terminal input"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

