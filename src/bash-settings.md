---
layout: layout2.njk
title: Bash settings for developer environment
author: Vijay Dharap
timestamp: January 12, 2021
tags: [developer, tools]
---

# {{ title }}

I use linux as my client machine to work in my kubernetes environment. Most of the work is done by firing various commands in the terminal. Hence the command history is a precious goldmine. Typically, bash is quite lax in saving the history and also ensuring the history is saved in multiple sessions running in parallel.

Here are some of the things that we should do in order to ensure 
* the history size is large
* history is saved after every command
* history from multiple sessions is merged (e.g. tmux, byobu, screen etc)


``` shell
# must be added in .bashrc
# history gets appended / merged
shopt -s histappend
# large history size
HISTFILESIZE=1000000
HISTSIZE=1000000
# save all multiline commands in single line
shopt -s cmdhist
# Save history after every command
PROMPT_COMMAND='history -a'
```

### References:
* [Ref 1](https://blog.sanctum.geek.nz/better-bash-history/)
* [Ref 2](https://www.thomaslaurenson.com/blog/2018/07/02/better-bash-history/)
