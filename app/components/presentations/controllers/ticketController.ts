import { TicketDTO } from '~/components/applications/dto/ticketDTO'
import { TicketInputPort } from '~/components/applications/input/TicketInputPort'
import { TicketOutputPort } from '~/components/applications/output/TicketOutputPort'
import { ticketInteractor } from '~/components/applications/usecase/TicketInteractor'
import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import { ticketRepositoryImpl } from '~/components/infrastructures/repositries/ticketRepositoryImpl'

import { ticketPresenter } from '../presenters/ticketPresenter'

type TicketControllerProps = {
	ticketInputPort: TicketInputPort
}

export const TicketController = ({
	ticketInputPort,
}: TicketControllerProps) => ({
	//プロジェクト内のアクティブチケット取得
	getActiveTickets: (projectId: string): Promise<TicketDTO[]> => {
		return ticketInputPort.findActiveTickets(projectId)
	},
})

export const createTicketController = (
	r: ITicketRepository = ticketRepositoryImpl,
	o: TicketOutputPort = ticketPresenter
) => {
	const ticketInputPort = ticketInteractor(r, o)

	return TicketController({ ticketInputPort })
}
