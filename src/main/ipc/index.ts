import setupWindowController from './WindowController'
import setupRouteController from './RouteController'
import setupSongs from './Songs'
import setupState from './State'

export default () => {
    setupWindowController()
    setupRouteController()
    setupSongs()
    setupState()
}
