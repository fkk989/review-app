"use client";
import { useRouter } from "next/navigation";

export function CompanyLink() {
  const navigate = useRouter();
  const companyObj: Array<{ title: string; link: string }> = [
    {
      title: "support",
      link: "support",
    },
    {
      title: "billing policy",
      link: "billingpolicies",
    },
    {
      title: "terms & services ",
      link: "terms",
    },
    {
      title: "privicy policy",
      link: "support",
    },
    {
      title: "customer review",
      link: "review",
    },
  ];
  return (
    <ul className="flex flex-col">
      <li className="mb-[10px] text-[18px] font-bold">
        <h3>Company</h3>
      </li>
      {companyObj.map(({ title, link }) => {
        return (
          <li
            key={title}
            onClick={() => {
              navigate.push(link);
            }}
            className="gap-[3px]"
          >
            {title}
          </li>
        );
      })}
    </ul>
  );
}
