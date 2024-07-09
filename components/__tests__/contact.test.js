import { render, screen } from "@testing-library/react"
import ContactUs from "../ContactUs"
import '@testing-library/jest-dom'

test("should load contact page", () => {
    render(<ContactUs />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
})

test("should load button", () => {
    render(<ContactUs />)
    const button = screen.getByRole('button')
    const text = screen.getByText('Submit')
    const placeHolder = screen.getByPlaceholderText('Placeholder')
    expect(text).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(placeHolder).toBeInTheDocument()
})