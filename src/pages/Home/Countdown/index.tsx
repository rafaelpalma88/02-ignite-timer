import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '..'
import { CountdownContainer, Separator } from './styles'

export const Countdown: React.FC = () => {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext)

  const totalSeconds = (activeCycle != null) ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = (activeCycle != null) ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle != null) {
      document.title = `${minutes}:${seconds} | Ignite Timer`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number
    console.log('activeCycle dentro de useEffectxxx -> ', activeCycle)
    if (activeCycle != null) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsDifference >= totalSeconds) {
          console.log('2 xxx -> ', secondsDifference)
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          console.log('3 xxx -> ', secondsDifference)
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
