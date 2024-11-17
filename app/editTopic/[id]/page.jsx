export default function EditTopic() {
    return (
        <div>
            Edit Topic Form
        <form className="flex flex-col gap-3">
        <input className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic"
        />
        <input className="border border-slate-500 px-8 py-10"
        type="text"
        placeholder="Topic Description"
        />
        <button className="border-4 border-[#29637f] bg-[#060f1b] font-bold text-[#29637f] py-3 px-6 w-fit">Update This Topic</button>
    </form>
        </div>
    );
} // EditTopic