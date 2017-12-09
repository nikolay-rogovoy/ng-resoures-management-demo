import {Component, OnInit} from '@angular/core';
import {DatasourceService, Power, Resource, ResourceTimelineDailyItemDailyItemQuantum, Task, TaskPlan} from 'ng-resoures-management';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html'
})
export class WorkComponent implements OnInit {

    /***/
    resources: Resource[] = [];

    /***/
    constructor(public rmSource: DatasourceService) {
    }

    /***/
    ngOnInit() {
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
                    new Task(new Date(year, month, day, 10), new Date(year, month, day, 11), 'Заказ №1', 'Описание тут'),
                    new Task(new Date(year, month, day, 15), new Date(year, month, day, 16), 'Заказ №2', 'Описание тут'),
                    new Task(new Date(year, month, day, 12), new Date(year, month, day, 13), 'Заказ №2', 'Описание тут')
                ], [
                    new Power(new Date(year, month, day, 9), new Date(year, month, day, 12)),
                    new Power(new Date(year, month, day, 14), new Date(year, month, day, 18)),
                    new Power(new Date(year, month, day + 1, 9), new Date(year, month, day + 1, 12)),
                    new Power(new Date(year, month, day + 1, 14), new Date(year, month, day + 1, 18))
                ]),
                new Resource(2, 'Петр', 'Чайковский', [
                    new Task(new Date(year, month, day, 10), new Date(year, month, day, 11), 'Заказ №1', 'Описание тут'),
                    new Task(new Date(year, month, day, 15), new Date(year, month, day, 16), 'Заказ №2', 'Описание тут'),
                    new Task(new Date(year, month, day, 12), new Date(year, month, day, 13), 'Заказ №2', 'Описание тут')
                ], [
                    new Power(new Date(year, month, day, 9), new Date(year, month, day, 12)),
                    new Power(new Date(year, month, day, 14), new Date(year, month, day,18)),
                    new Power(new Date(year, month, day + 1, 9), new Date(year, month, day + 1, 12)),
                    new Power(new Date(year, month, day + 1, 14), new Date(year, month, day + 1, 18))
                ])

            ];

        let taskPlans = [
            new TaskPlan('Замер № 123', 'г. Краснодар, ул. Садовая, д. 1, кв. 1', 2, null),
            new TaskPlan('Замер № 123', 'г. Краснодар, ул. Садовая, д. 1, кв. 1', 3, null)
        ];
        this.rmSource.resources.next(this.resources);
        this.rmSource.taskPlans.next(taskPlans);
    }

    ResourceLocation(resourceTimelineDailyItemDailyItemQuantum: ResourceTimelineDailyItemDailyItemQuantum) {

        /**Размер кванта, минут*/
        const quantumSize = 60;

        // Получить дату и время
        let dtStart = this.addMinutes(resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItem.date,
            resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItemQuantum.startTime);

        let dtEnd = this.addMinutes(resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItem.date,
            resourceTimelineDailyItemDailyItemQuantum.timelineDailyItemDailyItemQuantum.timelineDailyItemQuantum.startTime +
            resourceTimelineDailyItemDailyItemQuantum.taskPlan.quQuantum * quantumSize);

        let task = new Task(dtStart, dtEnd, resourceTimelineDailyItemDailyItemQuantum.taskPlan.info,
            resourceTimelineDailyItemDailyItemQuantum.taskPlan.info);

        // Создать такой таск
        resourceTimelineDailyItemDailyItemQuantum.resorce.tasks.push(task);

        // В ресурс добавить таск
        resourceTimelineDailyItemDailyItemQuantum.taskPlan.task = task;

        /**Обновить отрисовку*/
        this.rmSource.resources.next(this.resources);
    }

    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
}
