'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import SideDecorations from '@/components/SideDecorations';

const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false });

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-[#022b14] p-6">
      <Snowfall />
      <SideDecorations />
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="border-[#f4f0ec] text-[#f4f0ec] hover:bg-[#034a21] bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til spillet
            </Button>
          </Link>
        </div>

        <Card className="bg-[#034a21] border-[#f4f0ec] text-[#f4f0ec]">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Sådan fungerer spillet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Spillets gang</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  Når du starter spillet ved at klikke på "Start!" knappen, vises der først en kort
                  intro.
                </li>
                <li>
                  Herefter begynder tallene at blive trukket automatisk et ad gangen. Hvert tal
                  vises på skærmen med et kort klip.
                </li>
                <li>
                  Når en spiller har bingo, trykker du på "Bingo!" knappen. Dette pauser spillet og
                  viser et kort videoklip.
                </li>
                <li>
                  Når videoklippet er slut, har I tid til at tjekke tallene på vedkommendes plade.
                </li>
                <li>
                  Efter at have tjekket tallene kan spillet fortsættes ved at trykke på "Start!"
                  knappen igen.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Print dine egne plader</h2>
              <p>
                Du kan printe dine egne bingoplader ved at klikke på{' '}
                <Button
                  variant="link"
                  className="text-[#f4f0ec] hover:text-[#c41e3a] p-0 h-auto font-semibold underline underline-offset-4"
                  onClick={() => window.open('/print', '_blank')}
                >
                  Print plader
                </Button>{' '}
                her eller via knappen i øverste højre hjørne. Dette åbner en ny side hvor du kan
                udskrive to tilfældigt genererede bingoplader. Hvis du ønsker at generere to nye
                plader, kan du blot genindlæse siden ved at trykke F5 eller klikke på
                genindlæs-knappen i din browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Start et nyt spil</h2>
              <p>
                Når spillet er slut, eller hvis I ønsker at starte forfra, kan I klikke på "Nyt
                spil" knappen. Dette nulstiller alle trukne numre og starter et helt nyt spil.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Hvem står bag?</h2>
              <p className="mb-2">
                Dette bingospil er udviklet af BUSY, der siden 2007 har specialiseret sig i at skabe
                succesfulde digitale løsninger for store virksomheder i Danmark. Med en bred palette
                af kompetencer inden for forretningsudvikling, UX/UI-design og frontend-udvikling,
                bygger BUSY bro mellem forretningsvision og teknisk implementering.
              </p>
              <p className="mb-2">
                Ved at kombinere design og teknisk ekspertise hjælper BUSY virksomheder med at skabe
                brugervenlige og effektive digitale løsninger, der understøtter deres
                forretningsmål.
              </p>
              <p className="text-sm italic">
                Og en gang imellem bliver der også tid til at lave et sjovt og totalt formålsløst
                sideprojekt som dette.
              </p>
              <div className="mt-4">
                <a
                  href="https://busycph.dk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c41e3a] hover:underline font-medium"
                >
                  Besøg BUSY's hjemmeside
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
