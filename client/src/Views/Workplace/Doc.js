import Automerge from 'automerge';

export default class Doc {
    constructor(id) {
        this.doc = Automerge.change(Automerge.init(id), doc => {
            doc.text = new Automerge.Text();
        });
    }
}