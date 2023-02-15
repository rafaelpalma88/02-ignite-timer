import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../context/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const History: React.FC = () => {
  const { cycles } = useContext(CyclesContext)

  useEffect(() => {
    console.log('valor de cycles dentro de history xxx -> ', cycles)
  }, [cycles])

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <pre>{JSON.stringify(cycles, null, 2)}</pre>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

          {/* "id": "1676395522110",
          "task": "bater punheta",
          "minutesAmount": 5,
          "startDate": "2023-02-14T17:25:22.110Z"
          interruptedDate?: Date
          finishedDate?: Date
          */}

            { cycles.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.minutesAmount} minutos</td>
                  <td>{formatDistanceToNow(item.startDate, {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    { (item.finishedDate != null) && (<Status statusColor="green">Concluído</Status>) }
                    { (item.interruptedDate != null) && (<Status statusColor="red">Interrompido</Status>) }
                    { ((item.finishedDate == null) && (item.interruptedDate == null)) && <Status statusColor="yellow">Em andamento</Status> }
                  </td>
                </tr>
              )
            })}

            {/* <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr> */}
          </tbody>
        </table>
      </HistoryList>

    </HistoryContainer>
  )
}
