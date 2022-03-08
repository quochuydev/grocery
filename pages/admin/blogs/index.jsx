/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@components/admin/Layout";
import Modal from "@components/Modal";

const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps({ req }) {
  if (!req.session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}

export default function AdminBlogs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdminLayout current="blog">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        123123132
      </Modal>

      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Blogs
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
          >
            New blog
          </button>
        </div>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">Project</span>
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Members
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last updated
            </th>
            <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  <div
                    className={classNames(
                      project.bgColorClass,
                      "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                    )}
                    aria-hidden="true"
                  />
                  <a href="#" className="truncate hover:text-gray-600">
                    <span>
                      {project.title}{" "}
                      <span className="text-gray-500 font-normal">
                        in {project.team}
                      </span>
                    </span>
                  </a>
                </div>
              </td>
              <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    {project.members.map((member) => (
                      <img
                        key={member.handle}
                        className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                        src={member.imageUrl}
                        alt={member.name}
                      />
                    ))}
                  </div>
                  {project.totalMembers > project.members.length ? (
                    <span className="flex-shrink-0 text-xs leading-5 font-medium">
                      +{project.totalMembers - project.members.length}
                    </span>
                  ) : null}
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                {project.lastUpdated}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
