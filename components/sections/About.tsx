"use client";

import Section from "@/components/ui/Section";
import Gonjong from "@/components/ui/Gonjong";
import { brand, contacts, principles } from "@/data/brand";
import { topics } from "@/data/exploring";
import { useLang } from "@/lib/i18n";

/**
 * About: three paragraphs in the first person, a short list of facts,
 * and what is being studied right now. The portrait is
 * `public/brand/portrait.jpg`; without it there is simply no photo.
 */
export default function About({ portrait }: { portrait: string | null }) {
  const { lang, t } = useLang();

  return (
    <Section id="about" label={{ en: "About", id: "Tentang" }} title={{ en: "Who is writing this.", id: "Siapa yang menulis ini." }}>
      <div className="mt-10 grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div className="prose-mut flex flex-col gap-5 text-base md:text-lg">
          {lang === "en" ? (
            <>
              <p>
                I am Defri Fega Pratama, Minangkabau, living in Indonesia. I studied Informatics; my thesis in 2024
                trained a convolutional neural network to classify leaf disease and put it online as a web app.
              </p>
              <p>
                Since then most of my work has been systems people use every day: a CRM/ERP that runs an export
                company&rsquo;s operations, a Flutter back office for a meat distributor that works offline, an Android
                English tutor I sell directly to users, and web projects from a 186-SKU storefront to a brand site for the
                Japanese market.
              </p>
              <p>
                I call myself a problem solver before a software engineer because the order matters: the technology comes
                after the problem is understood. I try to keep solutions{" "}
                {principles.map((p, i) => (
                  <span key={p.word.en}>
                    <em>{t(p.word)}</em> ({t(p.meaning)}){i < principles.length - 1 ? (i === principles.length - 2 ? " and " : ", ") : "."}
                  </span>
                ))}
              </p>
            </>
          ) : (
            <>
              <p>
                Saya Defri Fega Pratama, orang Minangkabau, tinggal di Indonesia. Saya kuliah Informatika; skripsi saya
                tahun 2024 melatih convolutional neural network untuk mengklasifikasi penyakit daun dan menayangkannya
                sebagai web app.
              </p>
              <p>
                Sejak itu sebagian besar pekerjaan saya adalah sistem yang dipakai orang setiap hari: CRM/ERP yang
                menjalankan operasional sebuah perusahaan ekspor, back office Flutter untuk distributor daging yang jalan
                tanpa internet, tutor bahasa Inggris Android yang saya jual langsung ke pengguna, dan proyek web dari
                storefront 186 SKU sampai situs brand untuk pasar Jepang.
              </p>
              <p>
                Saya menyebut diri problem solver sebelum software engineer karena urutannya penting: teknologi datang
                setelah masalahnya dipahami. Saya berusaha menjaga solusi tetap{" "}
                {principles.map((p, i) => (
                  <span key={p.word.id}>
                    <em>{t(p.word)}</em> ({t(p.meaning)}){i < principles.length - 1 ? (i === principles.length - 2 ? ", dan " : ", ") : "."}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>

        <div>
          {portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portrait}
              alt={brand.name}
              className="mb-8 aspect-[4/5] w-full max-w-[320px] object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}

          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
            <dt className="text-dim">{lang === "en" ? "Name" : "Nama"}</dt>
            <dd>{brand.name}</dd>
            <dt className="text-dim">{lang === "en" ? "Roots" : "Asal"}</dt>
            <dd className="flex items-center gap-2">
              <Gonjong className="h-3.5 w-auto text-accent" />
              {brand.roots}
            </dd>
            <dt className="text-dim">{lang === "en" ? "Based" : "Lokasi"}</dt>
            <dd>{t(brand.place)}</dd>
            <dt className="text-dim">{lang === "en" ? "Studied" : "Pendidikan"}</dt>
            <dd className="text-mut">{t(brand.education)}</dd>
            <dt className="text-dim">Email</dt>
            <dd>
              <a href={`mailto:${contacts.email}`} className="link">
                {contacts.email}
              </a>
            </dd>
            <dt className="text-dim">GitHub</dt>
            <dd>
              <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="link">
                {contacts.github.replace("https://", "")}
              </a>
            </dd>
          </dl>

          <div className="mt-10">
            <p className="label">{lang === "en" ? "Studying now" : "Sedang dipelajari"}</p>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm">
              {topics.map((topic) => (
                <li key={topic.name.en}>
                  <span className="font-medium">{t(topic.name)}</span>
                  <span className="text-mut">: {t(topic.note)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
