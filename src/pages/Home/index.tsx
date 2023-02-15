import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Countdown } from './Countdown'
import { NewCycleForm } from './NewCycleForm'
import { CyclesContext } from '../../context/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home: React.FC = () => {
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  function handleCreateNewCycle (data: NewCycleFormData): void {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="" >

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
          <Countdown />
        </FormProvider>

        {(activeCycle != null)
          ? (
            <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
              <HandPalm size={24} /> Interromper
            </StopCountdownButton>
            )
          : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCountdownButton>
            )}
      </form>
    </HomeContainer>
  )
}
