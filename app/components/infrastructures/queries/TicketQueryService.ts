import { parse } from '@formkit/tempo'

import { EventsLogDTO } from '~/components/applications/dto/ticketDTO'
import { ITicketQueryService } from '~/components/applications/input/TicketInputPort'
import { db } from '~/components/infrastructures/db'

export const ticketQueryService: ITicketQueryService = {
	async getEventsLog(projectId: string): Promise<EventsLogDTO[]> {
		return Promise.resolve(
			db
				.from('ticket_histories')
				.select(
					`
					  id,
					  event_time,
					  details,
					  event_types (
						event
					  ),
					  tickets (
						id
					  ),
					  users (
						clerk_username
					  )
					`
				)
				.eq('tickets.project_id', projectId)
		).then(({ data, error }) => {
			if (error) {
				throw new Error(error.message)
			}

			if (!data || data.length === 0) {
				return []
			}
			const eventsLogDTO: EventsLogDTO[] = data.map(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(eventsLog: any) => ({
					id: eventsLog.id,
					eventType: eventsLog.event_types.event,
					username: eventsLog.users.clerk_username,
					eventTime: parse(eventsLog.event_time),
					details: eventsLog.details,
				})
			)
			return eventsLogDTO
		})
	},
}
