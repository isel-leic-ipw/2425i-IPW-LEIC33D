//curl -X PUT http://localhost:9200/tasks

// Create a task
//curl -X POST --data '{ "title" : "Task1" , "description" : "task 1 elastic", "userId": "iduser" }' -H "Content-Type: application/json" http://localhost:9200/tasks/_doc

import {MAX_LIMIT} from '../../services/services-constants.mjs'
import {get, post, del, put} from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'


export default function (indexName = 'tasks') {

    const URI_MANAGER = uriManager(indexName)

    return {
        getTasks: getTasks,
        getTask: getTask,
        updateTask: updateTask,
        createTask: createTask,
        deleteTask: deleteTask
    }

    async function getTasks(userId, q, skip, limit) {
        const query = {
            query: {
              match: {
                "userId": userId
              }
            }
          }
        return post(URI_MANAGER.getAll(), query)
            .then(body => body.hits.hits.map(createTaskFromElastic))
            .then(filterTasks)

        function filterTasks(tasks) {
            const predicate = q ? t => t.title.includes(q) : t => true
            const retTasks = tasks.filter(predicate)
            
            const end = limit != MAX_LIMIT ? (skip+limit) : retTasks.length
            return retTasks.slice(skip,  end)
        }

    }

    async function getTask(userId, taskId) {
        return get(URI_MANAGER.get(taskId))
            .then(verifyTask)

        function verifyTask(task) {
            return task.found && task._source.userId == userId ? createTaskFromElastic(task) : undefined
        }
    }

    async function createTask(userId, taskRepresentation) {
        taskRepresentation.userId = userId
        return post(URI_MANAGER.create(), taskRepresentation)
            .then(body => { taskRepresentation.id = body._id; return taskRepresentation })
    }

    async function updateTask(taskId, taskRepresentation) {
        return put(URI_MANAGER.update(taskId), taskRepresentation)
    }

    async function deleteTask(id) {
        return del(URI_MANAGER.delete(id), )
            .then(body => body._id)
    }


    function createTaskFromElastic(taskElastic) {
        let task = Object.assign({id: taskElastic._id}, taskElastic._source)
        return task
    }
}