export default class ContentFormat {
    _contentObj(type, content) {
        return {
            type: type,
            content: content
        };
    }

    text(text) { return this._contentObj("text", text); }
    room(room) { return this._contentObj("room", room); }
    userJoins(user) { return this._contentObj("user joins", user); }
    userLeaves(id) { return this._contentObj("user leaves", id); }
}