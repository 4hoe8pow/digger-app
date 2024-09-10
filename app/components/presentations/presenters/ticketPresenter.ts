/* eslint-disable no-console */
import { TicketDTO } from '~/components/applications/dto/ticketDTO'
import { TicketOutputPort } from '~/components/applications/output/TicketOutputPort'

export const ticketPresenter: TicketOutputPort = {
	presentTicket: (ticket: TicketDTO) => {
		console.log('Ticket Details:', ticket)
		// ここでチケット詳細をUIに反映する処理を実装
	},

	presentTickets: (tickets: TicketDTO[]) => {
		console.log('List of Tickets:', tickets)
		// ここでチケットのリストをUIに反映する処理を実装
	},

	presentTicketCreationSuccess: () => {
		console.log('Ticket successfully created.')
		// チケットの作成成功をユーザーに通知する処理を実装
	},

	presentTicketUpdateSuccess: () => {
		console.log('Ticket successfully updated.')
		// チケットの更新成功をユーザーに通知する処理を実装
	},

	presentTicketDeletionSuccess: () => {
		console.log('Ticket successfully deleted.')
		// チケットの削除成功をユーザーに通知する処理を実装
	},

	presentError: (error: Error) => {
		console.error('An error occurred:', error.message)
		// エラーメッセージをユーザーに通知する処理を実装
	},
}
