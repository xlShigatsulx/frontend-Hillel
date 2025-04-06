export function MemberCard({ member }) {
  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-white">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={member.image}
          alt={member.name}
        />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-amber-900">
          {member.name}
        </h5>
        <span className="text-xs text-amber-500">{member.description}</span>
      </div>
    </div>
  );
}
