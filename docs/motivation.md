---
layout: default
title: Motivation
nav_order: 9
---

# Motivation

**Why does this exist?**

There are no tools provided by the core mobx or mobx-state-tree team which provide direct hooks support for mobx-state-tree models.

## Issues with React Context

Up until mobx-store-provider all indications were that others were using the React Context API directly, and online sources were encouraging others to do the same.

This will work...however there are a couple shortcomings/issues to consider with using the Context API directly:

- Having to maintain imports/exports of the `Provider` manually, for each model you want to create.

  This extra bit of housekeeping just isn't necessary with mobx-store-provider. Model instances and access to their `Provider` or `Context` is handled for you through a straight-forward and terse API.

- Using the Context API in a modern functional React component is clunky.

  Function components, along with hooks provide a much cleaner and direct interface to the state and its related logic.

## How does mobx-store-provider work

The goal is to provide a simple API that allows you to use mobx-state-tree from within [React Function Components](https://www.robinwieruch.de/react-function-component).

It accomplishes this by providing React hooks designed specifically to help manage **mobx-state-tree** models (using React Context underneath) from within your components. Essentially, it uses the same React Context API you would use directly - but it provides a developer friendly interface for use in functional components.

## A personal note on 'why'

I have been a long time user and lover of **mobx** and especially **mobx-state-tree**...so when I went to start incorporating functional components (the new, modern way to write React) I was surprised to find no library (or API provided by the core team) to handle **mobx-state-tree** models.

- There are hooks to create and manage **mobx** observables (and related) using the core supported [mobx-react](https://github.com/mobxjs/mobx-react#mobx-react) library...but nothing for **mobx-state-tree**.

- There are [examples](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j) as well as [various discussions](https://dev.to/margaretkrutikova/how-to-mobx-state-tree-react-typescript-3d5j/comments) and a [github issue](https://github.com/mobxjs/mobx-state-tree/issues/1363) talking about using React Context directly.

- ...but no simple, React Hook API to use **mobx-state-tree** from within my components like I was expecting.

...so I ended up just making what I thought should have already existed, basically.

[Back to **Introduction**](/){: .btn .btn-blue }
