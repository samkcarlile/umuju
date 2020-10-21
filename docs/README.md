# umuju

## Overview

**umuju** is a programming language that you write using emojis. It compiles to Javascript code.

## Examples

### `hello_world.umu`

```
💬 The clap requires a module
👏 📟

📟🗣 "Hello World!"
```

---

### `user_input.umu`

```
👏 📟

💬 Variables can be any emoji (be careful not to overwrite a module 😬)
🏷 = 📟👂 “What’s your name?”

💬 You can use ✨ for templating strings
📟🗣 “Hello ✨🏷!”
```

---

### `fetch_todo.umu`

```
👏 📟
👏 📡
💬 This is the module that lets you work with JSON
👏 📇

💬 Convert a string to a number using the 🔢 function
💬 The ⬅️ is used to chain function calls.
🆔 = 🔢 ⬅️ 📟👂 "Which todo would you like to get?"

💬 An if statement to make sure the number is between 1 and 200
💬 (Code blocks and expressions are surrounded by any number of
💬  any tree emoji)
🤔 ❗️🌲🌲 🆔 🌖 0 && 🆔 🌘 200 🌲🌲 🌳
  📟🗣 "ID must be between 1 and 200 (inclusive)"
  💬 The 👋 emoji exits the program
  👋
🌳

💬 Send a GET request to a url, checking for an error
✉️,⛔️ = 📡🤏 “https://jsonplaceholder.typicode.com/todos/✨🆔”
🤔 ⛔️ 🌴
  📟🗣 "There was an error! ✨⛔️"
  👋
🌴

💬 Convert the response body to JSON
📄 = 📇👈 < ✉️🚹

💬 We take the "completed" property from the body
💬 and convert it to a boolean
✅ = ☯️ < 📄🔑 "completed"

💬 An if/else statement checking if the "completed" property is true
🤔 ✅ 🎄
  📟🗣 "Todo #✨🆔 is complete!"
🎄 🙃 🌴
  📟🗣 "Todo #✨🆔 is not complete. 😔"
🌴
```

## 📖 Language Reference
