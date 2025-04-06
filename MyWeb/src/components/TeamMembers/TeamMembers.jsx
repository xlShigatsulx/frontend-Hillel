import { MemberCard } from './MemberCard';

const members = [
  {
    name: 'Name1',
    description: 'some text1',
    image: '/Класичні.jpg',
  },
  {
    name: 'Name2',
    description: 'some text2',
    image: '/Класичні.jpg',
  },
  {
    name: 'Name3',
    description: 'some text3',
    image: '/Класичні.jpg',
  },
  {
    name: 'Name4',
    description: 'some text4',
    image: '/Класичні.jpg',
  },
];

export function TeamMembers() {
  return (
    <>
      <div className='flex flex-col items-center w-full h-auto bg-[url("/teammembersbg.png")] bg-repeat bg-center p-5'>
        <span className="text-white text-center bg-amber-500 w-[150px] p-2 rounded-full shadow-xl">
          TEAM MEMBERS
        </span>

        <span className="text-4xl font-bold text-orange-950 mt-10">
          Наші досвідчені шеф-кухарі
        </span>
        <div className="flex flex-row gap-10 my-20">
          {members.map((member) => (
            <div key={member.name} className="text-center px-10">
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
