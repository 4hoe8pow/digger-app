import {
	EventsLogDTO,
	TicketSaveDTO,
	TicketViewDTO,
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
	getProjectTickets: (
		projectId: string,
		status: 'active' | 'all'
	): Promise<TicketViewDTO[]> => {
		return status === 'active'
			? ticketInputPort.findActiveTickets(projectId)
			: ticketInputPort.findProjectTickets(projectId)
	},

	//チケットに関するイベントログ取得
	getEventsLog: (projectId: string): Promise<EventsLogDTO[]> => {
		return ticketInputPort.getEventsLog(projectId)
	},

	//チケットの作成
	openTicket: (data: TicketSaveDTO): Promise<void> => {
		return ticketInputPort.saveTicket(data)
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
