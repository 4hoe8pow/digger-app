import { ProjectViewDTO } from '~/components/applications/dto/projectDTO'
import { ProjectOutputPort } from '~/components/applications/output/ProjectOutputPort'

export const projectPresenter: ProjectOutputPort = {
	presentProject(project: ProjectViewDTO) {
		console.log('Project presented:', project)
		// プロジェクトのプレゼンテーションロジックをここに実装
		// 例: UI の状態を更新、通知を表示など
	},

	presentProjectCreationSuccess() {
		console.log('Project creation succeeded')
		// プロジェクト作成成功時の処理
		// 例: 成功通知の表示
	},

	presentProjectUpdateSuccess() {
		console.log('Project update succeeded')
		// プロジェクト更新成功時の処理
	},

	presentProjectDeletionSuccess() {
		console.log('Project deletion succeeded')
		// プロジェクト削除成功時の処理
	},

	presentError(error: Error) {
		console.error('Error occurred:', error)
		// エラーハンドリングのロジック
		// 例: エラーメッセージの表示
	},
}
