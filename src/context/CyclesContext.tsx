import { createContext, useEffect, useReducer, useState, type ReactNode } from 'react'
import { type Cycle, cyclesReducer } from '../reducers/cycles'

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
  // const [cycles, setCycles] = useState<Cycle[]>([])

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const { cycles, activeCycleId } = cyclesState

  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {
    console.log('activeCycle xxx -> ', activeCycle)
  }, [activeCycle])

  function setSecondsPassed (seconds: number): void {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished (): void {
    // setCycles(state => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     setActiveCycleId(null)
    //     return { ...cycle, finishedDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // }))
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
  }

  function createNewCycle ({ task, minutesAmount }: CreateCycleData): any {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }
    // setCycles([...cycles, newCycle])

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })

    // setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle (): void {
    // setCycles(state => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptedDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // }))
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })
    // setActiveCycleId(null)
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
