---
layout: default
title: Motivation
nav_order: 9
---

# Motivation

_Why does this exist?_

**Quick answer:** There are no tools provided by the core **mobx** or **mobx-state-tree** teams which provide direct hooks support for **mobx-state-tree** models.

- [What are the benefits?](#what-are-the-benefits)
- [Can't I just use React Context?](#cant-i-just-use-react-context)
- [How does mobx-store-provider work?](#how-does-mobx-store-provider-work)
- [A personal note on 'why'](#a-personal-note-on-why)

## What are the benefits?

- A clean, simple, and straight-forward API.
- [mapStateToProps](/api/useStore#using-a-mapstatetoprops-callback) support (analogous to [Redux mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate)).
- [Multiple stores](/multiple-stores) support.

## Can't I just use React Context?

Yes, as an alternative you _can use_ the React Context API directly.

...but there are a couple of issues to consider:

- Manual React Context management, which includes:

  - Creating and instrumenting the React Context.

  - Maintaining the imports and exports of the `Provider` and `Context`.

  Both of these are especially cumbersome if you have multiple models.

  With **mobx-store-provider** model instances as well as access to their `Provider` and `Context` are managed for you through a simplified and terse API.

- Using the Context API (directly) in a modern functional React component is clunky.

  The hooks provided by **mobx-store-provider** supply you with a much more idiomatic React Hook interface to your state and its related logic.

## How does mobx-store-provider work?

It uses React Context, wrapping a developer friendly hooks-based interface around it for use in functional components.

The goal is to provide a simple API that allows you to use mobx-state-tree from within [React Function Components](https://www.robinwieruch.de/react-function-component) while also giving a couple additional features to help with application development and cover common use cases.

## A personal note on 'why'

I have been a long time user and lover of **mobx** and especially **mobx-state-tree**...so when I went to start incorporating functional components (the new, modern way to write React) I was surprised to find no library (or API provided by the core team) to handle **mobx-state-tree** models.

- There are hooks to create and manage **mobx** observables (and related) using the core supported [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) and [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite) libraries.

- There is [an example](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j) as well as a [discussion](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j/comments) and a [github issue](https://github.com/mobxjs/mobx-state-tree/issues/1363) which talk about using React Context.

- There was no React Hook API to use/manage **mobx-state-tree** models from within functional components like I was expecting.

So I ended up just making what I thought should have already existed.

[Back to **Introduction**](/){: .btn .btn-blue }
