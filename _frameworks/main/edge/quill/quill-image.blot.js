function initBlockImageCustomBlot(){

    var quillBlockEmbed = Quill.import('blots/block/embed');

    class blockImageCustomBlot extends quillBlockEmbed {
        /*static blotName = 'image_custom';
        static className = 'blog_image_post';
        static tagName = 'div';*/

        static create(data){
            var img, id=0;
            if (typeof data == 'object') {
                img = data.img;
                id = data.id;
            } else {
                img = data;
            }

            const node = super.create();

            node.setAttribute('contenteditable', false);

            const nodeImg = document.createElement('img');
            nodeImg.setAttribute('src', img);
            if(id){
                nodeImg.dataset.id = id;
            }
            node.appendChild(nodeImg);

            node.addEventListener('click', (e) => {
                e.preventDefault()
            })

            node.addEventListener('dblclick', (e) => {
                e.preventDefault()
            })

            return node;
        }

        static value(node) {
            return node.querySelector('img').getAttribute('src');
        }

    }

    blockImageCustomBlot.blotName = 'image_custom';
    blockImageCustomBlot.className = 'blog_image_post';
    blockImageCustomBlot.tagName = 'div';

    Quill.register(blockImageCustomBlot);

}