module.exports = {
    help: (user) =>
        `
<b>${user.name}, добро пожаловать в профиль!</b>
<b>id:</b> ${user.chatId}
<b>Логин:</b> ${user.name}
<b>Количество выполненных заказов:</b> ${user.ordersCount}
`
}
