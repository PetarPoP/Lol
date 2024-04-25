import { Button } from "@/components/ui/button.tsx";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";
import { useState } from "react";
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza.tsx";

export function PredavaciCard({
  presenter,
}: Readonly<{ presenter: Presenter }>) {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [viewPresenter, setViewPresenter] = useState(false);

  return (
    <div className="flex border rounded-md overflow-hidden bg-white dark:bg-black/30 dark:text-white transition-all w-full">
      <div>
        <img
          src={presenter.image}
          alt="Presenter"
          className="border-r bg-white"
        />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{presenter.name}</h1>
          <p>{presenter.description}</p>
          <ListItem title="ORGANIZACIJE">
            {storeData.organizers
              .filter((organizer: Filter) =>
                presenter.organizersId.includes(organizer.id),
              )
              .map((organizer: Filter) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {storeData.topics
              .filter((topic: Filter) => presenter.topicIds.includes(topic.id))
              .map((topic: Filter) => (
                <Badge key={topic.id}>{topic.name}</Badge>
              ))}
          </ListItem>
        </div>
        <div className="flex gap-2">
          <Credenza open={viewPresenter} onOpenChange={setViewPresenter}>
            <CredenzaTrigger asChild>
              <Button className="animate-fade-in-up transition-all">
                Pregledaj predavača
              </Button>
            </CredenzaTrigger>
            <CredenzaContent className="min-w-[550px]">
              <CredenzaHeader className="flex justify-center items-center uppercase">
                <CredenzaTitle>{presenter.name}</CredenzaTitle>
              </CredenzaHeader>
              <div className="flex flex-row gap-4">
                <img
                  src={presenter.image}
                  alt="Presenter"
                  className="border-r bg-white flex rounded w-[170px] h-[170px] object-cover"
                />
                <div className="flex flex-col justify-center gap-3">
                  <div className="h-[50%] w-full whitespace-nowrap overflow-hidden text-wrap">
                    {presenter.description}
                  </div>
                  <div className="flex flex-col gap-3">
                    <ListItem title={"ORGANIZACIJA"}>
                      {storeData.organizers
                        .filter((organizer: Filter) =>
                          presenter.organizersId.includes(organizer.id),
                        )
                        .map((organizer: Filter) => (
                          <Badge key={organizer.id}>{organizer.name}</Badge>
                        ))}
                    </ListItem>
                    <ListItem title={"Teme"}>
                      {storeData.topics
                        .filter((topic: Filter) =>
                          presenter.topicIds.includes(topic.id),
                        )
                        .map((topic: Filter) => (
                          <Badge key={topic.id}>{topic.name}</Badge>
                        ))}
                    </ListItem>
                  </div>
                </div>
              </div>
              <CredenzaFooter>
                <Button
                  onClick={() => {
                    setViewPresenter(false);
                  }}
                >
                  Zatvori
                </Button>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
          {store.isAdmin && (
            <Button
              className="animate-fade-in-up transition-all"
              variant="secondary"
            >
              Uredi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
