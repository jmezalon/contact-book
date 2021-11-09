function Form({ formData, onHandleChange, onHandleSubmit }) {
    return (
        <form className="contact-form" onSubmit={onHandleSubmit}>
            <label>
                <input aria-label="first Name" placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={onHandleChange} />
            </label>
            <label>
                <input aria-label="last Name" placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={onHandleChange} />
            </label>
            <label>
                <input aria-label="avatar" placeholder="image Url" type="text" name="avatar" value={formData.avatar} onChange={onHandleChange} />
            </label>
            <label>
                <input aria-label="phone number" placeholder="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={onHandleChange} />
            </label>
            <label>
                <input aria-label="e-mail" placeholder="E-mail" type="email" name="email" value={formData.email} onChange={onHandleChange} />
            </label>
            <label>Favorite: 
                <input aria-label="favorite" type="checkbox" name="favorite" value={formData.favorite} onChange={onHandleChange} />
            </label>
            <button>Submit</button>
        </form>
    )
}

export default Form