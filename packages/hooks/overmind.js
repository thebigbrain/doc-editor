import { createHook, createConnect, Provider } from 'overmind-react'

export * from 'overmind';

export const useOvermind = createHook()

export const withOvermind = createConnect()
export const OvermindProvider = Provider
