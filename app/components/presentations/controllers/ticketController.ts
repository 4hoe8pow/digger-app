import {
	EventsLogDTO,
	TicketDTO,
} from '~/components/applications/dto/ticketDTO'
import {
	ITicketQueryService,
	TicketInputPort,
} from '~/components/applications/input/TicketInputPort'
import { TicketOutputPort } from '~/components/applications/output/TicketOutputPort'
import { ticketInteractor } from '~/components/applications/usecase/TicketInteractor'
import { ITicketRepository } from '~/components/domains/ticket/ITicketRepository'
import { ticketQueryService } from '~/components/infrastructures/queries/TicketQueryService'
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

	//チケットに関するイベントログ取得
	getEventsLog: (projectId: string): Promise<EventsLogDTO[]> => {
		return ticketInputPort.getEventsLog(projectId)
	},
})

export const createTicketController = (
	r: ITicketRepository = ticketRepositoryImpl,
	q: ITicketQueryService = ticketQueryService,
	o: TicketOutputPort = ticketPresenter
) => {
	const ticketInputPort = ticketInteractor(r, q, o)

	return TicketController({ ticketInputPort })
}
