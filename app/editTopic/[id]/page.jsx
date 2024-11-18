import EditTopicForm from "@/app/components/EditTopicForm";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: "no-store",
        });
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Failed to fetch Updating item");
        }
        
    } catch(error) {
        console.log(error);
    } // try catch for fetch
};
export default async function EditTopic({params}) {
    const { id } = params;
    const { topic } = await getTopicById(id);
    const { title, description } = topic;
    return <EditTopicForm id={id} title={title} description={description}/>;
} // EditTopic