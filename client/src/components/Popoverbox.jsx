import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ListFilter } from "lucide-react";
import { orderOptions, sortOptions } from "../utils/constants";
import Checkbox from "./Checkbox";

const Popoverbox = () => {
  const [order, setOrder] = useState(orderOptions[0].value);
  const [sort, setSort] = useState(sortOptions[0].value);

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="flex items-center justify-center h-[50px] w-[50px] rounded-lg bg-primary text-white">
            <ListFilter />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-3 bg-white w-[300px] rounded-lg shadow-md p-5 border border-gray-300">
              <div className="space-y-5">
                <div>
                  <h1 className="text-xl font-semibold">Filter</h1>
                  <ul className="mt-2 flex flex-col gap-3">
                    {sortOptions.map((item) => (
                      <li
                        key={item.title}
                        onClick={() => setSort(item.value)}
                        className="flex items-center gap-3"
                      >
                        {sort === item.value ? (
                          <Checkbox type="checked" />
                        ) : (
                          <Checkbox />
                        )}
                        <p className="cursor-default">{item.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Order</h1>
                  <ul className="mt-2 flex flex-col gap-3">
                    {orderOptions.map((item) => (
                      <li
                        key={item.title}
                        onClick={() => setOrder(item.value)}
                        className="flex items-center gap-3"
                      >
                        {order === item.value ? (
                          <Checkbox type="checked" />
                        ) : (
                          <Checkbox />
                        )}
                        <p className="cursor-default">{item.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Popoverbox;
