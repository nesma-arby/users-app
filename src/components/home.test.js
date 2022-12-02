import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Home from './home';

jest.mock("axios");


const dummyUsers = [
    {
        id: '29052d42',
        name: "nesma",
        mail: 'nesm',
        password: '111'
    },
    {
        id: '0ebef847',
        name: "ahmed",
        mail: 'ahmed',
        password: '111'
    },
    {
        id: '0ebef849',
        name: "farida",
        mail: 'farida',
        password: '111'
    },
];
const resp = { data: dummyUsers };


test("Featch Users List", async () => {

    axios.get.mockResolvedValue(resp);

    render(<Home />);

    const UsersList = await waitFor(() => screen.findAllByTestId("user"));

    expect(UsersList).toHaveLength(3);

});

