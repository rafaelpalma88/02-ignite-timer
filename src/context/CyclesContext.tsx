import { differenceInSeconds } from 'date-fns'
import { createContext, useEffect, useReducer, useState, type ReactNode } from 'react'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import { type Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: ({ task, minutesAmount }: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider: any = ({ children }: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    (initialState) => {
      console.log('initialState xxx -> ', initialState)
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      )
      console.log('storedStateAsJSON xxx -> ', storedStateAsJSON)
      if (storedStateAsJSON) {
        console.log('storedStateAsJSON xxx -> ', storedStateAsJSON)
        const teste = JSON.parse(storedStateAsJSON)
        console.log('teste xxx -> ', teste)
        return teste
      }
      return initialState
    }
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate)
      )
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed (seconds: number): void {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished (): void {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle ({ task, minutesAmount }: CreateCycleData): any {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }
  function interruptCurrentCycle (): void {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      { children }
    </CyclesContext.Provider>
  )
}
