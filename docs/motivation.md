---
layout: default
title: Motivation
nav_order: 12
---

# Motivation

_Why was mobx-store-provider created?_

- Answer:

  **There was no React Hooks API to use mobx-state-tree in functional components**.

- Long answer:

  I have been a long time user and fan of **mobx** and especially **mobx-state-tree**...so when I went to start incorporating [React Function Components](https://www.robinwieruch.de/react-function-component) (the new, sexy, modern way to write React) I asked myself:

  _How do I use mobx-state-tree in my functional components?_

  After some extensive google-fu, and a lot of reading, I was surprised to find no library or hooks API to handle **mobx-state-tree** in [React Function Components](https://www.robinwieruch.de/react-function-component).

  Here is what I did find out:

  - There are existing hooks to create and manage **mobx** observables (and related) using the core supported [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) and [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite) libraries.

  - There is [an example](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j) as well as a [discussion](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j/comments) and a [github issue](https://github.com/mobxjs/mobx-state-tree/issues/1363) which talk about using React Context to access **mobx-state-tree** models within React Function Components.

  - There was no React Hooks API to manage **mobx-state-tree** models directly from within functional components like I was expecting.

  So I ended up creating what I thought should have already existed.

## Common Questions

- [What are the benefits?](#what-are-the-benefits)
- [How does mobx-store-provider work?](#how-does-mobx-store-provider-work)
- [Can't I just use React Context?](#cant-i-just-use-react-context)

## What are the benefits?

The goal is to provide a simple API that allows you to use **mobx-state-tree** from within [React Function Components](https://www.robinwieruch.de/react-function-component).

Compared to using the React Context API directly, using **mobx-store-provider** gives you:

- A clean, simple, and straight-forward hooks-based API.
- [Automatic type inferrence](/typescript) (this is [manually handled in normal mobx-state-tree applications](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time)).
- [Multiple stores](/multiple-stores) support.

**mobx-store-provider** aims to be a focused library, minimalist, and limited in scope.

This gives it an _extremely small_ footprint:

![Package size](https://img.shields.io/bundlephobia/minzip/mobx-store-provider)

## How does mobx-store-provider work?

Internally it uses [React Context](https://reactjs.org/docs/context.html) - similar to what is suggested in the [example](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j), [discussion](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j/comments), and [github issue](https://github.com/mobxjs/mobx-state-tree/issues/1363) mentioned prior.

The main difference is that it wraps a developer friendly hooks-based API around it for use in functional components.

Have a [look at the source](https://github.com/jonbnewman/mobx-store-provider/blob/master/src/index.ts), its only ~80 lines.

## Can't I just use React Context?

Yes, as an alternative you _can use_ the [React Context](https://reactjs.org/docs/context.html) API directly.

...but there are a couple of issues to consider:

1. Manual React Context management, which includes:

   - Creating and instrumenting the React Context.

   - Maintaining the imports and exports of the `Provider` and `Context`.

   Both of these are especially cumbersome if you have multiple **mobx-state-tree** models to contend with.

   With **mobx-store-provider** model instances as well as access to their `Provider` and `Context` are managed for you through a simplified and terse API.

1. Using the Context API (directly) in a modern functional React component is clunky.

   The API provided by **mobx-store-provider** supplies you with a much more idiomatic React Hooks based interface to your state and its related logic.

1. If you are using typescript, you will have to [manage your model types manually](https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time).

These are the problems **mobx-store-provider** was written to solve.

[Next: **Upgrading 1.x -> 2.x**](/upgrade){: .btn .btn-blue }
