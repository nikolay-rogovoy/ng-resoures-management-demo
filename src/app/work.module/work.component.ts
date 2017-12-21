import {Component, OnInit, ViewChild} from '@angular/core';
import {
    DatasourceService, Power, Resource, ResourceManagerComponent, ResourceTimelineDailyItemDailyItemQuantum, Task,
    TaskPlan
} from 'ng-resoures-management';
import {TimelineDailyItem} from 'ng-resoures-management/timeline-daily-item';
import {TimelineDailyItemQuantum} from 'ng-resoures-management/timeline-daily-item-quantum';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html'
})
export class WorkComponent implements OnInit {

    @ViewChild(ResourceManagerComponent)
    resourceManagerComponent: ResourceManagerComponent;

    /***/
    resources: Resource[] = [];

    /***/
    constructor(public rmSource: DatasourceService) {
    }

    /***/
    ngOnInit() {
        //this.rmSource.startTimeSubject.next(8 - new Date().getTimezoneOffset() / 60);
        //this.rmSource.endTimeSubject.next(18 - new Date().getTimezoneOffset() / 60);
        this.f();
    }

    f() {

        let curDate = new Date();
        let year = curDate.getFullYear();
        let month = curDate.getMonth();
        let day = curDate.getDate();


        this.resources =
            [
                new Resource(1, 'Василий', 'Иванов', [
                    new Task(1, new Date(year, month, day, 10), new Date(year, month, day, 11 ), 'Заказ №1', 'Описание тут',  null),
                    new Task(2, new Date(year, month, day, 15 ), new Date(year, month, day, 16 ), 'Заказ №2', 'Описание тут',  null),
                    new Task(3, new Date(year, month, day, 12 ), new Date(year, month, day, 13 ), 'Заказ №2', 'Описание тут',  null)
                ], [
                    new Power(new Date(year, month, day, 9 ), new Date(year, month, day, 12 )),
                    new Power(new Date(year, month, day, 14 ), new Date(year, month, day, 18 )),
                    new Power(new Date(year, month, day + 1, 9 ), new Date(year, month, day + 1, 12 )),
                    new Power(new Date(year, month, day + 1, 14 ), new Date(year, month, day + 1, 18 ))
                ], null),
                new Resource(2, 'Петр', 'Чайковский', [
                    new Task(4, new Date(year, month, day, 10 ), new Date(year, month, day, 11 ), 'Заказ №1', 'Описание тут', null),
                    new Task(5, new Date(year, month, day, 15 ), new Date(year, month, day, 16 ), 'Заказ №2', 'Описание тут', null),
                    new Task(6, new Date(year, month, day, 12 ), new Date(year, month, day, 13 ), 'Заказ №2', 'Описание тут', null)
                ], [
                    new Power(new Date(year, month, day, 9 ), new Date(year, month, day, 12 )),
                    new Power(new Date(year, month, day, 14 ), new Date(year, month, day,18 )),
                    new Power(new Date(year, month, day + 1, 9 ), new Date(year, month, day + 1, 12 )),
                    new Power(new Date(year, month, day + 1, 14 ), new Date(year, month, day + 1, 18 ))
                ], null)

            ];

        let taskPlans = [
            new TaskPlan(1, 'Замер № 123', 'г. Краснодар, ул. Садовая, д. 1, кв. 1', 2, null, null),
            new TaskPlan(2, 'Замер № 123', 'г. Краснодар, ул. Садовая, д. 1, кв. 1', 3, null, null)
        ];
        console.log(this.resources);
        this.rmSource.resources.next(this.resources);
        this.rmSource.taskPlans.next(taskPlans);
    }

    ResourceLocation(resourceTimelineDailyItemDailyItemQuantum: ResourceTimelineDailyItemDailyItemQuantum) {

        // Перенос
        if (resourceTimelineDailyItemDailyItemQuantum.taskPlan.task) {
            for (let task of resourceTimelineDailyItemDailyItemQuantum.resource.tasks) {
                if (task === resourceTimelineDailyItemDailyItemQuantum.taskPlan.task)
                    resourceTimelineDailyItemDailyItemQuantum.resource.tasks
                        .splice(resourceTimelineDailyItemDailyItemQuantum.resource.tasks.indexOf(task), 1);
            }
        }

        /**Размер кванта, минут*/
        const quantumSize = 60;

        // Получить дату и время
        let dtStart = this.addMinutes(resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItem.date,
            resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItemQuantum.startTime);

        let dtEnd = this.addMinutes(resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItem.date,
            resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItemQuantum.startTime +
            resourceTimelineDailyItemDailyItemQuantum.taskPlan.quQuantum * quantumSize);

        console.log(`ResourceLocation dtStart=${dtStart.toString()} | ${dtStart.toUTCString()} || ${new Date().getTimezoneOffset()}`);

        let task = new Task(
            resourceTimelineDailyItemDailyItemQuantum.taskPlan.id,
            dtStart, dtEnd,
            resourceTimelineDailyItemDailyItemQuantum.taskPlan.info,
            resourceTimelineDailyItemDailyItemQuantum.taskPlan.info, null);

        // Создать такой таск
        resourceTimelineDailyItemDailyItemQuantum.resource.tasks.push(task);

        // В ресурс добавить таск
        resourceTimelineDailyItemDailyItemQuantum.taskPlan.task = task;

        /**Обновить отрисовку*/
        this.rmSource.resources.next(this.resources);
    }

    /**Отменить размещение*/
    ResourceCancelLocation(taskPlan: TaskPlan) {
        // Удалить такой таск
        for (let resource of this.resourceManagerComponent.resources) {
            for (let task of resource.tasks) {
                if (task === taskPlan.task)
                resource.tasks.splice(resource.tasks.indexOf(task), 1);
            }
        }
        taskPlan.task = null;

        /**Обновить отрисовку*/
        this.resourceManagerComponent.loadResources();
    }

    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
}
