---
layout: default
title: Motivation
nav_order: 9
---

# Motivation

**Why does this exist?**

**In summary:** There are no tools provided by the core **mobx** or **mobx-state-tree** teams which provide direct hooks support for **mobx-state-tree** models.

## Using React Context

You can use the React Context API directly, and various online sources encourage this. There are a couple issues to consider with this:

- Manual Context management, which includes

  - Creating and instrumenting the React Context

  - Maintaining the imports and exports of the `Provider` and `Context`

  With **mobx-store-provider** model instances as well as access to their `Provider` and `Context` are managed for you through a simplified and terse API.

- Using the Context API (directly) in a modern functional React component is clunky.

  The Context API isn't really consistent or clean (_idiomatic_) when used with React Function Components.

  The hooks provided by **mobx-store-provider** supply you with a much more idiomatic React Hook interface to your state and its related logic.

## How mobx-store-provider works

The goal is to provide a simple API that allows you to use mobx-state-tree from within [React Function Components](https://www.robinwieruch.de/react-function-component), while also giving a couple additional features to help with application development and cover common use cases.

It accomplishes this by providing React hooks designed specifically to help manage **mobx-state-tree** models (using native React Context underneath) from within your components. Essentially, it uses the same React Context API you would use directly - but it provides a developer friendly interface for use in functional components.

## What are the benefits?

In a short bullet-listed summary, the benefits are:

- Cleaner, simpler, more intuitive and straight-forward API for use in [React Function Components](https://www.robinwieruch.de/react-function-component).
- [mapStateToProps](/api/useStore#using-a-mapstatetoprops-callback) (analagous to [Redux mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate))
- [multiple stores](/multiple-stores) support

## A personal note on 'why'

I have been a long time user and lover of **mobx** and especially **mobx-state-tree**...so when I went to start incorporating functional components (the new, modern way to write React) I was surprised to find no library (or API provided by the core team) to handle **mobx-state-tree** models.

- There are hooks to create and manage **mobx** observables (and related) using the core supported [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library...but nothing for **mobx-state-tree**.

- There are [examples](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j) as well as a [discussions](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j/comments) and [github issue](https://github.com/mobxjs/mobx-state-tree/issues/1363) talking about using React Context directly.

- There is no React Hook API to use **mobx-state-tree** from within functional components like I was expecting.

So I ended up just making what I thought should have already existed.

[Back to **Introduction**](/){: .btn .btn-blue }
