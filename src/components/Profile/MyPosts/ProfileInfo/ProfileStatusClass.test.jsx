import React from "react";
import { create } from "react-test-renderer";
import ProfileStatusClass from "./ProfileStatusClass";

// здесь набор тестов
describe("ProfileStatus component", () => {
    // тест на получение props компонентой в локальном state
    test("status from props should be in the state", () => {
        // виртуально создаем компоненту для теста и типа передаем
        // status в props
        const component = create(<ProfileStatusClass status="test status" />);
        // создаем сущность такой компоненты и тестим ее
        // можно создать несколько сущностей но передавать разные значения
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test status");
    });

    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatusClass status="test status" />);
        const root = component.root;
        // проверка на поиск span в компоненте
        let span = root.findByType("span");
        // span не должен быть null
        expect(span).not.toBeNull();
    });

    test("after creation input should't be displayed", () => {
        const component = create(<ProfileStatusClass status="test status" />);
        const root = component.root;
        //let input = root.findByType("input");
        //expect(input).toBeNull();
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
});
